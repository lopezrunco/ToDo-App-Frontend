import { useContext } from 'react'

import { AuthContext } from '../../../../App'

import './style.scss'

function HomeIntro() {

    const { state } = useContext(AuthContext)

    return (
        <section className="home-intro">
            <article className="container ptop-60">
                <h1>Organize everything with DUIT!</h1>
                <p>Get all those tasks out of your head to put them on your to-do list (no matter where you are or what device you're using).</p>
                {state.isAuthenticated ? (
                    <a className="button primary-button" href="home">My tasks</a>
                ) : (
                    <a className="button primary-button" href="login">Login</a>
                )}
            </article>
        </section>
    )
}

export default HomeIntro