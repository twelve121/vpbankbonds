import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Menu from './Menu'
import Table from './Table';
import AddBonds from './AddBonds'
import moment from 'moment';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';


function Home() {
    const [showAdd, setShowAdd] = useState(false)
    const [data, setData] = useState([])
    const [addData, setAddData] = useState([])
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [action, setAction] = useState('')
    const [alert, setAlert] = useState('')


    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const [dataRow, setDataRow] = useState([])
    const checkedRow = dataRow.map(item => ({
        ...item.original
    }))
    useEffect(() => {
        axios.post('http://localhost:1337/asset/getlistProfessasset').then(
            (value) => {
                // setData(value.data.DT.dataAll)
                const data = value.data.DT.dataAll.map(item => ({
                    ...item,
                    MINAMT: numberWithCommas(item.MINAMT),
                    FRDATE: moment(item.FRDATE)._i,
                    TODATE: moment(item.TODATE)._i
                }))
                setData(data)
            }
        )
        axios.post('http://localhost:1337/asset/getlistassetcode').then(
            (value) => {
                setAddData(value.data)
            }
        )
    }, [reload, loading]);

    const data1 = addData.map(item => ({
        value: item.value,
        label: item.label,
    }))

    setTimeout(() => { setAlert('') }, 6000);

    const handleDeleteRow = async (checked) => {
        setLoading(true)
        if (checkedRow) {
            await axios.post('http://localhost:1337/asset/mt_professasset', {
                p_symbol: checked.SYMBOL,
                p_professasset: checked.PROFESSASSET,
                p_minamt: checked.MINAMT,
                p_frdate: checked.FRDATE,
                p_todate: checked.TODATE,
                pv_language: "vie",
                pv_objname: "PROFESSASSET",
                pv_action: "DELETE",
                p_autoid: checked.AUTOID
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
    const handleDelete = () => {
        checkedRow.map(item => {
            handleDeleteRow(item)
        })
    }

    return (
        <div>
            <Menu />
            <div className='container'>
                <div className='vi-header'>
                    <h3 className='header-text'>Quản lý Trái phiếu Xác định NĐT CN</h3>
                    <div className='header-option'>
                        <span className='total-text'><i style={{ marginRight: '5px' }} className="fas fa-edit"></i> Tổng: {data.length}</span>
                        <i style={{ color: '#26ae4d', cursor: 'pointer' }} className='fas fa-sync-alt reload-api' onClick={() => setReload(!reload)}></i>
                        <button className='header-button' onClick={() => { setAction(''); setShowAdd(!showAdd) }}>
                            <i className="far fa-plus-circle"></i>
                            <span className='button-text'>Thêm</span>
                        </button>
                        {/* {showAdd && <AddBonds data1={data1} setLoading={setLoading} setShowAdd={setShowAdd} />} */}
                        <button className='header-button btn-danger' onClick={() => handleDelete()}>
                            <i className="far fa-times-circle"></i>
                            <span className='button-text'>Xóa</span>
                        </button>
                        <button className='header-button'>
                            <i className="far fa-cloud-download"></i>
                            <span className='button-text'>Kết xuất</span>
                        </button>
                    </div>
                </div>
                <div className='data-content'>
                    <Table
                        data={data}
                        data1={data1}
                        addData={addData}
                        setDataRow={setDataRow}
                        setShowAdd={setShowAdd}
                        showAdd={showAdd}
                        setAction={setAction}
                        action={action}
                        setLoading={setLoading}
                        alert={alert}
                        setAlert={setAlert}
                    />
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
            />
        </div>
    )
}

export default Home