import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='text-center py-5 bg-black'>
            <div>
                <p>&copy; {currentYear} Redline Crew. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer