import styles from './Dropdown.module.scss'

const DropdownContainer = ({ children, open }) => {
  return (
    <div className={open ? styles.dropdown_visible : styles.dropdown}>
      {children}
    </div>
  )
}

export default DropdownContainer
