import PropTypes from 'prop-types'

const Button = ({ bgColor, text, onClick }) => {
    return <button className='btn' style={{ backgroundColor: bgColor }} onClick={onClick}>{text}</button>   
}

Button.defaultProps = {
    color: '#51d0a6'
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default Button
