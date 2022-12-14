
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../../services';

import './style.scss';

import LogoImg from '../../assets/images/chopper-coin.png';

const nft_price = 10

const Home = () => {

  const [clicked, setClicked] = useState(false)
  const [coin_landed, setCoinLanded] = useState(false)
  const [shrink_landing, setShrinkLanding] = useState(false)

  const [sideRotationCount, setSideRotationCount] = useState(0)
  const [maxFlipAngle, setMaxFlipAngle] = useState(0)
  const [moveLoopCount, setMoveLoopCount] = useState(0)

  const [coins, setCoins] = useState(0)
  const [sold, setSold] = useState(false)

  const maxMoveLoopCount = 90

  const ref = useRef<HTMLDivElement>(null)

  const buyNft = () => {
    setCoins(coins - nft_price)
    setSold(true)
  }

  const onClick = () => {
    flipCoin()
  }

  const flipCoin = () => {
    if (clicked) return;

    setTimeout(() => {
        // Randomize the flipping speeds just for fun
        setSideRotationCount(Math.floor(Math.random() * 5) * 90)
        setMaxFlipAngle((Math.floor(Math.random() * 4) + 3) * Math.PI)
        setClicked(true);
    }, 50)
  }
    
  const resetCoin = () => {
    const coin = ref.current
    if (coin) {
      coin.style.setProperty('--coin-x-multiplier', '0')
      coin.style.setProperty('--coin-scale-multiplier', '0')
      coin.style.setProperty('--coin-rotation-multiplier', '0')
      coin.style.setProperty('--shine-opacity-multiplier', '0.4')
      coin.style.setProperty('--shine-bg-multiplier', '50%')
      coin.style.setProperty('opacity', '1')
      // Delay to give the reset animation some time before you can click again
      setTimeout(() => {
        setClicked(false);
        setMoveLoopCount(0);
      }, 300)
    }
  }

  const animationLoop = useCallback(() => {
    const coin = ref.current
    if (coin) {
      if (moveLoopCount < maxMoveLoopCount) {
        if (moveLoopCount === maxMoveLoopCount - 6) setShrinkLanding(true)
      
        let percentageCompleted = moveLoopCount / maxMoveLoopCount
        const angle = -maxFlipAngle * Math.pow((percentageCompleted - 1), 2) + maxFlipAngle
        // // Calculate the scale and position of the coin moving through the air
        coin.style.setProperty('--coin-y-multiplier', `${-11 * Math.pow(percentageCompleted * 2 - 1, 4) + 11}`)
        coin.style.setProperty('--coin-x-multiplier', `${percentageCompleted}`)
        coin.style.setProperty('--coin-scale-multiplier', `${percentageCompleted * 0.6}`)
        coin.style.setProperty('--coin-rotation-multiplier', `${percentageCompleted * sideRotationCount}`)
    
        // Calculate the scale and position values for the different coin faces
        // The math uses sin/cos wave functions to similate the circular motion of 3D spin
        coin.style.setProperty('--front-scale-multiplier', `${Math.max(Math.cos(angle), 0)}`)
        coin.style.setProperty('--front-y-multiplier', `${Math.sin(angle)}`)
    
        coin.style.setProperty('--middle-scale-multiplier', `${Math.abs(Math.cos(angle))}`)
        coin.style.setProperty('--middle-y-multiplier', `${Math.cos((angle + Math.PI / 2) % Math.PI)}`)
    
        coin.style.setProperty('--back-scale-multiplier', `${Math.max(Math.cos(angle - Math.PI), 0)}`)
        coin.style.setProperty('--back-y-multiplier', `${Math.sin(angle - Math.PI)}`)
    
        coin.style.setProperty('--shine-opacity-multiplier', `${4 * Math.sin((angle + Math.PI / 2) % Math.PI) - 3.2}`)
        coin.style.setProperty('--shine-bg-multiplier', `${-40 * (Math.cos((angle + Math.PI / 2) % Math.PI) - 0.5) + '%'}`)
        setMoveLoopCount(prevState => prevState + 1)
      } else {
        setCoinLanded(true)
  
        coin.style.setProperty('opacity', '0')
        setCoins(prevState => prevState + 1)
        
        setTimeout(() => {
          setClicked(false)
          setCoinLanded(false)
          setShrinkLanding(false)
          
          setTimeout(() => {
            resetCoin()
          }, 300)
        }, 1500)
      }
    }
  }, [moveLoopCount])

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        animationLoop()
      }, 5)
    }
  }, [clicked, animationLoop])

  return (
    <section className='home-section'>
      <div className="logout-container w-100 d-flex align-items-center justify-content-end">
        <Link
            to='/'
            onClick={() => StorageService.logout()} 
            className="text-link"
        >
            Logout
        </Link>
      </div>
      <div className="h-100 w-100 d-flex align-items-center justify-content-center flex-column">
        <div>
          <button onClick={onClick} className={`tip-button${clicked ? ' clicked' : ''}${coin_landed ? ' coin-landed' : ''}${shrink_landing ? ' shrink-landing' : ''}`}>
            <span className="tip-button__text">Get your coin!</span>
            <div className="coin-wrapper">
              <div ref={ref} className="coin">
                <div className="coin__middle"></div>
                <div className="coin__back"></div>
                <div className="coin__front"></div>
              </div>
            </div>
          </button>
        </div>
        <p className="subtitle-md text-default mt-lg mb-xhuge">{coins} Chopper {coins === 1 ? 'Coin' : 'Coins'}!</p>
        {!sold
          ? (
            <button 
              onClick={buyNft}
              disabled={coins < nft_price} 
              className='text-link mb-lg'
            >
              Get it now!
            </button>
          )
          : (
            <a className='text-link mb-lg' href={LogoImg} download="chopper_sticker">Download now!</a>
          )
        }
        {coins === nft_price || sold
          ? (
            <div className='open-reward'>
              <img src={LogoImg} />
            </div>
          )
          : (
            <div className="close-reward">
              <img src={LogoImg} />
              <p className='heading-lg'>C$ {nft_price}</p>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default Home