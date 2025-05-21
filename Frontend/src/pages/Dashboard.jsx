import { useSelector } from 'react-redux'

function Dashboard() {
    const { user } = useSelector(state => state.auth)
    return (
        <div>Dashboard and hello {user?.name}</div>
    )
}

export default Dashboard