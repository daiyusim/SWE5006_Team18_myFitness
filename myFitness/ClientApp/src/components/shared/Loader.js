import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useLoading } from './LoadingContext';

const Loader = () => {
    const { loading, setLoading } = useLoading()
    if (loading) {
        return <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
            open={loading} >
            <CircularProgress color="inherit" />
        </Backdrop >
    }
    return <p></p>
}

export default Loader

