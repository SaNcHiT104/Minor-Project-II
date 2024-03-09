import classes from './App.module.css'
import WelcomePage from './components/authComponent/WelcomePage'
export default function App() {
  return (
    <>
      <div className={classes.container}>
        <WelcomePage />
      </div>
    </>
  )

}