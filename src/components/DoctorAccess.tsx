import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

const PROGRAM_ID = new PublicKey('3DW73nMMHXjD7NEmndkvyuviiKycSS8KpAJXHQ2wwMAs');

export default function DoctorAccess() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [doctorPublicKey, setDoctorPublicKey] = useState('');
  const [isGranting, setIsGranting] = useState(false);

  const handleGrantAccess = async () => {
    if (!publicKey || !doctorPublicKey) return;

    setIsGranting(true);
    try {
      const patientAccount = PublicKey.findProgramAddressSync(
        [Buffer.from('patient'), publicKey.toBuffer()],
        PROGRAM_ID
      )[0];

      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: patientAccount, isSigner: false, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data: Buffer.from([2, ...new PublicKey(doctorPublicKey).toBuffer()]), // Instruction index for grant_doctor_access
      });

      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log('Doctor access granted successfully');
    } catch (error) {
      console.error('Error granting doctor access:', error);
    } finally {
      setIsGranting(false);
    }
  };

  return (
    <div>
      <h2>Grant Doctor Access</h2>
      <input
        type="text"
        value={doctorPublicKey}
        onChange={(e) => setDoctorPublicKey(e.target.value)}
        placeholder="Doctor's Public Key"
      />
      <button onClick={handleGrantAccess} disabled={isGranting || !publicKey || !doctorPublicKey}>
        {isGranting ? 'Granting Access...' : 'Grant Access'}
      </button>
    </div>
  );
}
