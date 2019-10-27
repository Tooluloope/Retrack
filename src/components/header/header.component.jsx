import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';


const Header = ({currentUser}) => (
    <div className='header'> 
        <Link to='/' className='logo-text'>
            {/* <Logo className='logo'></Logo> */}
            Retrack
        </Link>
        <div className='options'>
            <Link className='option' to='/'>
                CONTACT
            </Link>
            {
                
                currentUser ?
                <Link className='option' to='/profile'>{currentUser.displayName.toUpperCase()}</Link> :
                null
            }
            {
                
                currentUser ?
                <div className='option' onClick={()=> auth.signOut()} >SIGN OUT</div> :
                <Link className='option' to='/signin'>
                    SIGN IN/REGISTER
                </Link>
            }
            
        </div>
        
        
        
    </div>
)

const mapStateToProps = ({user:{currentUser}}) => ({
    currentUser,
})

export default connect(mapStateToProps)(Header);