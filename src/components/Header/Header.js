import { useState, useContext } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCog, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import DropdownContainer from '../Dropdown/DropdownContainer'
import DropdownItem from '../Dropdown/DropdownItem'
import { SettingsContext } from '../../context/SettingsContext'

const Header = () => {
  const [open, setOpen] = useState(false)
  const { settings, setSettings } = useContext(SettingsContext)

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className="logo">NewsBuddy</a>
      </Link>
      <div className={styles.header__settings}>
        <button className={styles.header__btn} onClick={() => setOpen(!open)}>
          <Icon icon={faCog} />
        </button>
        <DropdownContainer open={open}>
          <DropdownItem
            handleClick={() =>
              setSettings({
                ...settings,
                theme: settings.theme === 'dark' ? 'light' : 'dark'
              })
            }
          >
            Change Theme
            <Icon icon={settings.theme === 'dark' ? faSun : faMoon} />
          </DropdownItem>
          <DropdownItem
            handleClick={() =>
              setSettings({
                ...settings,
                includeImages: !settings.includeImages
              })
            }
          >
            {settings.includeImages ? 'Include' : 'Exclude'} Images (Articles)
          </DropdownItem>
        </DropdownContainer>
      </div>
    </header>
  )
}

export default Header
