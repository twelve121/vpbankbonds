import React, { useState } from 'react'
import Select, { AriaOnFocus } from 'react-select';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditModal(props) {
    const { data1, setShowEditModal, showDetailData } = props


    const newShowDetailData = {
        ...showDetailData,
        SYMBOL: {
            value: showDetailData.SYMBOL,
            label: showDetailData.SYMBOL
        },
        FULLNAMEASSET: {
            value: showDetailData.FULLNAMEASSET,
            label: showDetailData.FULLNAMEASSET
        }
    }

    const [symbol, setSymbol] = useState({})
    const [asset, setAsset] = useState({})
    const [minamt, setMinamt] = useState(showDetailData.MINAMT)
    const [frdate, setFrdate] = useState(new Date(showDetailData.FRDATE))
    const [todate, setTodate] = useState(new Date(showDetailData.TODATE))
    const [alert, setAlert] = useState('')
    
    const handleEdit = async () => {
        axios.post('http://localhost:1337/asset/mt_professasset', {
            p_symbol: symbol.value || showDetailData.SYMBOL,
            p_professasset: asset.value|| showDetailData.PROFESSASSET,
            p_minamt: minamt,
            p_frdate: moment(frdate).format('DD/MM/YYYY'),
            p_todate: moment(todate).format('DD/MM/YYYY'),
            pv_language: "vie",
            pv_objname: "PROFESSASSET",
            pv_action: "EDIT",
            p_autoid: showDetailData.AUTOID,

        }).then(
            (value) => {
                setAlert(value.data.EM)
            })
    }
    if (alert) {
        toast.success(alert, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const changeSymbol = (option) => {
        setSymbol(option)
    }
    const changeFullName = (option) => {
        setAsset(option)
    }
    console.log(symbol)
    console.log(asset)
    return (
        <div className="modal-add">
            <div className="modal-overlay" onClick={() => setShowEditModal(false)}></div>
            <div className="add-option">
                <div className="add-header">
                    <p className="add-header-text">xem chi tiết</p>
                    <button className="add-close" onClick={() => setShowEditModal(false)}>
                        <i className="fas fa-times add-close-icon"></i>
                    </button>
                </div>
                <div className="add-container">
                    <div className='add-wrapper'>
                        <div className='option-title'>
                            <h5 className='title-text'>Mã Trái phiếu Xác định NĐT CN</h5>
                            <h5 className='title-text'>Mã Trái phiếu</h5>
                            <h5 className='title-text'>Số tiền tối thiểu để xác định NĐT CN</h5>
                            <h5 className='title-text'>Ngày hiệu lực</h5>
                            <h5 className='title-text'>Ngày hết hạn</h5>
                        </div>
                        <div className='option-select'>
                            <form>
                                <div className='select-input'>
                                    <Select
                                        options={data1}
                                        onChange={changeFullName}
                                        defaultValue={newShowDetailData.FULLNAMEASSET}
                                        className="style-select"
                                    />
                                </div>
                                <div className='select-input'>
                                    <Select
                                        options={data1}
                                        onChange={changeSymbol}
                                        defaultValue={newShowDetailData.SYMBOL}
                                        className="style-select"
                                    />

                                </div>
                                <div className='select-input'>
                                    <input type="text" className="input-filter" value={minamt} onChange={e => setMinamt(e.target.value)} />
                                </div>
                                <div className='select-input'>
                                    <input type="date" className="input-filter" value={frdate} onChange={e => setFrdate(e.target.value)} />
                                </div>
                                <div className='select-input'>
                                    <input type="date" className="input-filter" value={todate} onChange={e => setTodate(e.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='input-wrapper'>
                        <input type="submit" className="submit-input" value="Chấp nhận" onClick={handleEdit} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditModal