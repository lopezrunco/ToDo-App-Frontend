import { useState } from 'react'
import MenuButton from './MenuButton'
import Navbar from './Navbar'
import { HeaderWrapper } from './styles'

function Nav() {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <HeaderWrapper>
            <Navbar open={open} />
            <MenuButton open={open} handleClick={handleClick} />
        </HeaderWrapper>
    )
}

export default Nav