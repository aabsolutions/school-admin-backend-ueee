"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/school-admin';
async function run() {
    await mongoose.connect(MONGO_URI);
    console.log('✔ Connected to MongoDB');
    const db = mongoose.connection.db;
    try {
        await db.collection('students').dropIndex('rollNo_1');
        console.log('✔ Dropped stale index: students.rollNo_1');
    }
    catch (e) {
        if (e.codeName === 'IndexNotFound') {
            console.log('  students.rollNo_1 — already gone, skipping');
        }
        else {
            console.error('  Error dropping students.rollNo_1:', e.message);
        }
    }
    try {
        await db.collection('students').createIndex({ dni: 1 }, { unique: true, sparse: true, name: 'dni_1' });
        console.log('✔ Ensured index: students.dni_1 (unique, sparse)');
    }
    catch (e) {
        if (e.codeName === 'IndexOptionsConflict' || e.codeName === 'IndexKeySpecsConflict') {
            console.log('  students.dni_1 — already exists with different options, dropping and recreating...');
            await db.collection('students').dropIndex('dni_1').catch(() => { });
            await db.collection('students').createIndex({ dni: 1 }, { unique: true, sparse: true, name: 'dni_1' });
            console.log('✔ Recreated index: students.dni_1 (unique, sparse)');
        }
        else {
            console.error('  Error creating students.dni_1:', e.message);
        }
    }
    try {
        await db.collection('teachers').createIndex({ dni: 1 }, { unique: true, sparse: true, name: 'dni_1' });
        console.log('✔ Ensured index: teachers.dni_1 (unique, sparse)');
    }
    catch (e) {
        if (e.codeName === 'IndexOptionsConflict' || e.codeName === 'IndexKeySpecsConflict') {
            console.log('  teachers.dni_1 — already exists with different options, dropping and recreating...');
            await db.collection('teachers').dropIndex('dni_1').catch(() => { });
            await db.collection('teachers').createIndex({ dni: 1 }, { unique: true, sparse: true, name: 'dni_1' });
            console.log('✔ Recreated index: teachers.dni_1 (unique, sparse)');
        }
        else {
            console.error('  Error creating teachers.dni_1:', e.message);
        }
    }
    await mongoose.disconnect();
    console.log('\n✔ Migration complete');
}
run().catch((err) => {
    console.error('Migration failed:', err);
    mongoose.disconnect();
    process.exit(1);
});
//# sourceMappingURL=migrate-drop-indexes.js.map