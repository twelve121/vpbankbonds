import React, { useState } from 'react';
import Select, { AriaOnFocus } from 'react-select';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

function AddBonds(props) {
    const { setShowAdd, data1, setLoading, showDetailData, setShowDetailData, newShowDetailData, action, alert, setAlert } = props

    const [symbol, setSymbol] = useState({})
    const [asset, setAsset] = useState({})
    const [minamt, setMinamt] = useState('')
    const [startFrDate, setStartFrDate] = useState(new Date(newShowDetailData.FRDATE));
    const [startToDate, setStartToDate] = useState(new Date(newShowDetailData.TODATE));
    console.log(action)
    const [startNewFrDate, setStartNewFrDate] = useState(new Date());
    const [startNewToDate, setStartNewToDate] = useState(new Date());

    const minamtFormat = (x) => {
        return x.toString().replace(/,/g, '');
    }

    const symbolName = Object.assign({}, data1.filter(item => item.value === newShowDetailData.SYMBOL.value).map(item => item.label));
    const showSymbol = {
        ...symbolName,
        SYMBOL: {
            value: symbolName[0],
            label: symbolName[0]
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (Object.keys(showDetailData).length === 0 &&
            Object.keys(symbol).length > 0 &&
            Object.keys(asset).length > 0 &&
            minamt !== '') {
            axios.post('http://localhost:1337/asset/mt_professasset', {
                p_symbol: symbol.value,
                p_professasset: asset.value,
                p_minamt: minamt,
                p_frdate: moment(startNewFrDate).format('DD/MM/YYYY'),
                p_todate: moment(startNewToDate).format('DD/MM/YYYY'),
                pv_language: "vie",
                pv_objname: "PROFESSASSET",
                pv_action: "ADD",
                p_autoid: "",
            })
                .then(
                    (value) => {
                        setAlert(value.data.EM)
                        const { EM } = value.data

                        if (EM === 'Thành công') {
                            toast.success('Thành Công', {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,

                            });
                            setLoading(false)
                            setShowAdd(false)
                            setShowDetailData({})
                        } else {
                            toast.error(EM, {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    })
        }
        else if (Object.keys(showDetailData).length === 0 &&
            Object.keys(asset).length === 0) {
            toast.error('Mã Trái phiếu Xác định NĐT CN không được để trống', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (Object.keys(showDetailData).length === 0 &&
            Object.keys(asset).length > 0 &&
            Object.keys(symbol).length === 0) {
            toast.error('Mã Trái phiếu không được để trống', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (Object.keys(showDetailData).length === 0 &&
            Object.keys(asset).length > 0 &&
            Object.keys(symbol).length > 0 &&
            !minamt
        ) {
            toast.error('Số tiền tối thiểu để xác định NĐT CN không được để trống', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            axios.post('http://localhost:1337/asset/mt_professasset', {
                p_symbol: symbol.value || showDetailData.SYMBOL,
                p_professasset: asset.value || showDetailData.PROFESSASSET,
                p_minamt: minamtFormat(minamt) || minamtFormat(showDetailData.MINAMT),
                p_frdate: moment(startFrDate).format('DD/MM/YYYY') || showDetailData.FRDATE,
                p_todate: moment(startToDate).format('DD/MM/YYYY') || showDetailData.TODATE,
                pv_language: "vie",
                pv_objname: "PROFESSASSET",
                pv_action: "EDIT",
                p_autoid: showDetailData.AUTOID,
            })
                .then(
                    (value) => {
                        setAlert(value.data.EM)
                        const { EM } = value.data

                        if (EM === 'Thành công') {
                            toast.success('Thành Công', {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,

                            });
                            setLoading(false)
                            setShowAdd(false)
                            setShowDetailData({})
                        } else {
                            toast.error(EM, {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    })
        }
    }

    const changeSymbol = (option) => {
        setSymbol(option)
    }
    
    const changeFullName = (option) => {
        setAsset(option)
    }

    const customStyles = {
        // For the select itself (not the options)
        control: (styles, { isDisabled }) => {
          return {
            ...styles,
            color: 'black',
            border: isDisabled ? '#f2f2f2' : '1px solid #818181',
            borderRadius: '2px'
          }
        },
        // For the options
        option: (styles, { isDisabled }) => {
          return {
            ...styles,
            backgroundColor: isDisabled ? '#f2f2f2' : '#fff',
            color: 'black',
          };
        },
      };


    return (
        <div className="modal-add">
            <div className="modal-overlay" onClick={() => { setShowAdd(false); setShowDetailData({}) }}></div>
            <div className="add-option">
                <div className="add-header">
                    <p className="add-header-text">
                        {(Object.keys(showDetailData).length === 0) ? 'thêm mới trái phiếu xác định nđt cn'
                            : action ? 'xem chi tiết'
                                : 'sửa trái phiếu xác định nđt cn'}
                    </p>
                    <button className="add-close" onClick={() => { setShowAdd(false); setShowDetailData({}) }}>
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
                                <div className={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? 'select-input-block' : 'select-input'}>
                                    <Select
                                        options={data1}
                                        onChange={changeFullName}
                                        styles={customStyles}
                                        defaultValue={newShowDetailData.FULLNAMEASSET}
                                        isDisabled={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? true : false}
                                    />
                                </div>
                                <div className={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? 'select-input-block' : 'select-input'}>
                                    <Select
                                        options={data1}
                                        onChange={changeSymbol}
                                        styles={customStyles}
                                        defaultValue={
                                            showSymbol.SYMBOL.value ?
                                                showSymbol.SYMBOL :
                                                newShowDetailData.SYMBOL
                                        }
                                        isDisabled={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? true : false}
                                    />
                                </div>
                                <div className='select-input'>
                                    {/* <input type="text" style={{ cursor: action ? 'not-allowed' : 'default' }} className="input-filter" disabled={action ? true : false} value={minamt} onChange={e => setMinamt(e.target.value)} /> */}
                                    <NumberFormat
                                        thousandSeparator={true}
                                        className={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? "input-filter-block" : "input-filter"}
                                        disabled={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? true : false}
                                        // value={minamt}
                                        defaultValue={newShowDetailData.MINAMT? newShowDetailData.MINAMT: minamt}
                                        onChange={e => setMinamt(e.target.value)}
                                        allowEmptyFormatting={false}
                                        allowNegative={false}
                                    />
                                </div>
                                <div className='select-input'>
                                    {/* <input type="date" className="input-filter" disabled={action?true:false} value={frdate} onChange={e => setFrdate(e.target.value)} /> */}
                                    <DatePicker
                                        dateFormat='dd/MM/yyyy'
                                        selected={(newShowDetailData.FRDATE._isValid === false) ? startNewFrDate : startFrDate}
                                        // onChange={(date) => setStartNewFrDate(date)}
                                        onChange={(Object.keys(showDetailData).length === 0) ? ((date) => setStartNewFrDate(date)): ((date) => setStartFrDate(date))}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? "input-filter-block" : "input-filter"}
                                        disabled={((action === "edit" && showDetailData.STATUS === "A") || (action === "view")) ? true : false}
                                    />
                                </div>
                                <div className='select-input'>
                                    {/* <input type="date" className="input-filter" disabled={action ? true : false} value={todate} onChange={e => setTodate(e.target.value)} /> */}
                                    <DatePicker
                                        dateFormat='dd/MM/yyyy'
                                        selected={(newShowDetailData.TODATE._isValid === false) ? startNewToDate : startToDate}
                                        // onChange={(date) => setStartNewToDate(date)}
                                        onChange={(Object.keys(showDetailData).length === 0) ? ((date) => setStartNewToDate(date)): ((date) => setStartToDate(date))}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className={(action === "view") ? "input-filter-block" : "input-filter"}
                                        disabled={(action === "view") ? true : false}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='input-wrapper'>
                        <input type="submit" className="submit-input" disabled={(action === "view") ? true : false} value="Chấp nhận" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            // className={'toast'}
            />
        </div>
    )
}

export default AddBonds