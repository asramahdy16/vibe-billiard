import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="text-9xl font-black text-on-surface-variant/20 mb-4 tracking-tighter">
          404
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md"
      >
        <h1 className="text-3xl font-black text-on-surface mb-2">
          Wah, Nyasar Ya?
        </h1>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          Halaman yang kamu cari sepertinya tidak ada, atau mungkin sudah dipindah ke meja lain.
        </p>

        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="h-5 w-5" />
          KEMBALI KE BERANDA
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
