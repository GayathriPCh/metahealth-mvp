import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';

const PROGRAM_ID = new PublicKey('3DW73nMMHXjD7NEmndkvyuviiKycSS8KpAJXHQ2wwMAs');

export default function RegisterPatient() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    if (!publicKey) return;

    setIsRegistering(true);
    try {
      const patientAccount = PublicKey.findProgramAddressSync(
        [Buffer.from('patient'), publicKey.toBuffer()],
        PROGRAM_ID
      )[0];

      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
          { pubkey: patientAccount, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: PROGRAM_ID,
        data: Buffer.from([0]), // Instruction index for register_patient
      });

      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log('Patient registered successfully');
    } catch (error) {
      console.error('Error registering patient:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div>
      <h2>Register as Patient</h2>
      <button onClick={handleRegister} disabled={isRegistering || !publicKey}>
        {isRegistering ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}
