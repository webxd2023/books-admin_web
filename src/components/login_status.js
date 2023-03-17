export let status=0;
const login_status = () => {
    return status
};
const set_status = datas => {
    if (datas===1){
        status=1
    }
};
