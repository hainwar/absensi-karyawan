import mongoose from 'mongoose';

const AbsensiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tanggal: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Hadir', 'Terlambat', 'Izin', 'Sakit'] },
});

export default mongoose.models.Absensi || mongoose.model('Absensi', AbsensiSchema);

