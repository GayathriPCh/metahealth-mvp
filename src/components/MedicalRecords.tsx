import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const PROGRAM_ID = new PublicKey('3DW73nMMHXjD7NEmndkvyuviiKycSS8KpAJXHQ2wwMAs');

export default function MedicalRecords() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  interface MedicalRecord {
    timestamp: bigint;
    encrypted_cid: string;
  }

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cidLinks, setCidLinks] = useState<{original: string, encrypted: string}[]>([]);

  const fetchRecords = async () => {
    if (!publicKey) return;

    setLoading(true);
    setError(null);

    try {
      const [patientAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from('patient'), publicKey.toBuffer()],
        PROGRAM_ID
      );

      const accountInfo = await connection.getAccountInfo(patientAccount);
      if (accountInfo && accountInfo.data) {
        const decodedData = decodePatientAccount(accountInfo.data);
        setRecords(decodedData.medical_records);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
      setError('Failed to fetch medical records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [publicKey, connection]);

  const uploadMedicalRecord = async () => {
    if (!publicKey || !file) return;

    try {
      // Prepare form data for Pinata
      const formData = new FormData();
      formData.append("file", file);

      // Upload file to Pinata
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET,
          "Content-Type": "multipart/form-data"
        },
      });

      // Get the CID from response
      const cid = resFile.data.IpfsHash;

      // Encrypt the CID
      const encryptedCid = CryptoJS.AES.encrypt(cid, 'YOUR_ENCRYPTION_KEY').toString();

      // Create instruction to store encrypted CID on-chain
      const [patientAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from('patient'), publicKey.toBuffer()],
        PROGRAM_ID
      );

      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: patientAccount, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
        ],
        programId: PROGRAM_ID,
        data: Buffer.from([1, ...Buffer.from(encryptedCid)])
      });

      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      // Refresh records after upload
      fetchRecords();

      // Update CID links state
      setCidLinks(prevLinks => [...prevLinks, { original: cid, encrypted: encryptedCid }]);
    } catch (error) {
      console.error('Error uploading medical record:', error);
      setError('Failed to upload medical record. Please try again.');
    }
  };

  function decodePatientAccount(data: Buffer<ArrayBufferLike>) {
    // Skip 8 bytes of discriminator
    let offset = 8;

    // Decode owner (Pubkey)
    const owner = new PublicKey(data.slice(offset, offset + 32));
    offset += 32;

    // Decode medical_records (Vec<MedicalRecord>)
    const numRecords = data.readUInt32LE(offset);
    offset += 4;
    const medical_records = [];
    for (let i = 0; i < numRecords; i++) {
      const timestamp = data.readBigInt64LE(offset);
      offset += 8;
      const cidLength = data.readUInt32LE(offset);
      offset += 4;
      const encrypted_cid = data.slice(offset, offset + cidLength).toString();
      offset += cidLength;
      medical_records.push({ timestamp, encrypted_cid });
    }

    // Decode authorized_doctors (Vec<Pubkey>)
    const numDoctors = data.readUInt32LE(offset);
    offset += 4;
    const authorized_doctors = [];
    for (let i = 0; i < numDoctors; i++) {
      authorized_doctors.push(new PublicKey(data.slice(offset, offset + 32)));
      offset += 32;
    }

    return { owner, medical_records, authorized_doctors };
  }

  if (loading) {
    return <div>Loading medical records...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Medical Records</h2>
      {records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              Timestamp: {new Date(Number(record.timestamp)).toLocaleString()}, 
              CID: {record.encrypted_cid}
            </li>
          ))}
        </ul>
      )}
      
      {/* File input for uploading files */}
      <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
      
      {/* Button to upload the selected file */}
      <button onClick={uploadMedicalRecord} disabled={!file}>
        Upload New Record
      </button>

      {/* Display original and encrypted CIDs */}
      {cidLinks.map((link, index) => (
        <div key={index}>
          Original CID: {link.original}<br />
          Encrypted CID: {link.encrypted}
        </div>
      ))}
      
    </div>
  );
}
