import { useSelector } from 'react-redux'
import './Notification.styles.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      <p className={notification[1]}>{notification[0]}</p>
    </div>
  )
}

export default Notification