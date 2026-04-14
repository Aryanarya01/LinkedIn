import React from 'react'
import styles from "./styles.module.css"
import { useRouter } from 'next/router'

const NavbarComponent = () => {
    const router = useRouter()
  return (
    <div className={styles.container}>
        <nav className={styles.navBar}>
            <h1>Pro Connect</h1>
        <div className={styles.navBar_OptionContainer}>
            <div >
                <p>Be a part</p>
            </div>

        </div>
        </nav>
    </div>
  )
}

export default NavbarComponent