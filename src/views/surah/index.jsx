import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Modal, Button } from 'react-bootstrap';

export default function SurahIndex() {
    const [surahs, setSurahs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurah, setSelectedSurah] = useState(null);
    const navigate = useNavigate();

    const fetchDataSurahs = async () => {
        await api.get('/api/surah')
            .then(response => {
                setSurahs(response.data);
            })
    }

    useEffect(() => {
        fetchDataSurahs();
    }, []);

    const handleShow = (surah) => {
        setSelectedSurah(surah);
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    const handleCardClick = (nomor) => {
        navigate(`/surah/${nomor}`);
    }

    return (
        <div className="container mt-5 mb-5">
            <h1 className="text-center mb-4">Qur'an</h1>
            <div className="row">
                {surahs.map((surah, index) => (
                    <div key={index} className="col-md-6 mb-4">
                        <div 
                            className="d-flex align-items-center bg-light p-3 rounded shadow-sm cursor-pointer"
                            onClick={() => handleCardClick(surah.nomor)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="me-3 text-white bg-danger p-2 rounded" style={{ width: '40px', textAlign: 'center' }}>
                                <strong>{surah.nomor}</strong>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="m-0 text-danger">{surah.nama_latin}</h5>
                                <small>{surah.arti}</small>
                                <p className="m-0 text-muted">{surah.jumlah_ayat} ayat, surah {surah.tempat_turun}</p>
                            </div>
                            <button className="btn btn-light" onClick={(e) => { e.stopPropagation(); handleShow(surah); }}>
                                <i className="bi bi-info-circle"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedSurah && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedSurah.nama_latin}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Arti:</strong> {selectedSurah.arti}</p>
                        <p><strong>Jumlah Ayat:</strong> {selectedSurah.jumlah_ayat}</p>
                        <p><strong>Tempat Turun:</strong> {selectedSurah.tempat_turun}</p>
                        <p><strong>Deskripsi:</strong> {selectedSurah.deskripsi || 'Deskripsi tidak tersedia'}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Tutup</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
