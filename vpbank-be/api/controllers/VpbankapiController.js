/**
 * VpbankapiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var axios = require('axios')

module.exports = {
    getlistProfessasset: async (req, res) => {
        axios({
            method: 'post',
            url: 'https://fcbond.fss.com.vn/asset/getlistProfessasset',
            data: {
                "language": "vie",
                "OBJNAME": "PROFESSASSET"
            },
            headers: {
                Authorization: 'Basic YWRtaW46RnNzY2JkQDEyMw==',
            }
        })
            .then((value) => {
                return res.send(value.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    
    getlistassetcode: async (req, res) => {
        axios({
            method: 'post',
            url: 'https://fcbond.fss.com.vn/asset/getlistassetcode',
            data: {
                "p_language": "vie",
                "OBJNAME": "PROFESSASSET"
            },
            headers: {
                Authorization: 'Basic YWRtaW46RnNzY2JkQDEyMw==',
            }
        })
            .then((value) => {
                return res.send(value.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    mt_professasset: async (req, res) => {
        const data1 =  req.body;
        axios({

            method: 'post',
            url: 'https://fcbond.fss.com.vn/asset/mt_professasset',
            data: data1,
            headers: {
                Authorization: 'Basic YWRtaW46RnNzY2JkQDEyMw==',
            }

        })
            .then((value) => {
                return res.send(value.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
};

