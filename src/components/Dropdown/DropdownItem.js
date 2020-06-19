import styles from './Dropdown.module.scss'

const DropdownItem = ({ children, handleClick }) => {
  return (
    <div className={styles.dropdown__item}>
      <button className={styles.dropdown__btn} onClick={handleClick}>
        {children}
      </button>
    </div>
  )
}

export default DropdownItem
