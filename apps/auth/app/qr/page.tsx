'use client';

import { useState } from 'react';

export default function Page() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  // Replace this with your API image
  const qrImage =
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MyTestCode';

  const handleVerify = () => {
    if (code === 'MyTestCode') {
      setMessage('✅ QR Code verified successfully!');
    } else {
      setMessage('❌ Invalid code, please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
        {/* Heading */}
        <h1 className='text-2xl font-bold mb-4'>Verify QR Code</h1>
        <p className='text-gray-600 mb-6'>
          Scan the QR code below and enter the code to verify.
        </p>

        {/* QR Image */}
        <div className='flex justify-center mb-6'>
          <img
            src={qrImage}
            alt='QR Code'
            width={200}
            height={200}
            className='rounded-lg border'
          />
        </div>

        {/* Input Field */}
        <input
          type='text'
          placeholder='Enter code from QR'
          value={code}
          onChange={e => setCode(e.target.value)}
          className='w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          Verify Code
        </button>

        {/* Message */}
        {message && (
          <p className='mt-4 text-sm font-medium text-gray-700'>{message}</p>
        )}
      </div>
    </div>
  );
}
