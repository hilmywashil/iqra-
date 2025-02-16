import { useState, useEffect } from 'react';

import api from '../../api';

import { Link } from 'react-router-dom';

export default function SurahIndex() {

    const [surahs, setSurahs] = useState([]);

    const fetchDataSurahs = async () => {

        await api.get('/api/surah')
            .then(response => {
                setSurahs(response.data);
            })

    }

    useEffect(() => {

        fetchDataSurahs();

    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 style={{textAlign: "center"}}>DAFTAR SURAH AL-QURAN</h1>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Nomor</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Nama Latin</th>
                                        <th scope="col">Jumlah Ayat</th>
                                        <th scope="col">Tempat Turun</th>
                                        <th scope="col">Arti</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        surahs.map((surah, index) => (
                                            <tr key={index}>
                                                <td>{surah.nomor}</td>
                                                <td>{surah.nama}</td>
                                                <td>{surah.nama_latin}</td>
                                                <td>{surah.jumlah_ayat}</td>
                                                <td>{surah.tempat_turun}</td>
                                                <td>{surah.arti}</td>
                                                <td className="text-center">
                                                    <Link to={`/surahs/${surah.nomor}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Detail</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}