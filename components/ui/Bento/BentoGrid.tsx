import Image from 'next/image'
import { Star } from 'lucide-react'
import AnimationContainer from '../Animations/animation-container'

export default function BentoComponent() {
    return (
        <div className='my-10 sm:flex sm:flex-col sm:align-center'>
            <AnimationContainer delay={0.1}>
                <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl mb-10">
                    Relied on by the world&apos;s best engineering teams
                </h1>
            </AnimationContainer>

            <div className="bg-black text-white p-8 rounded-3xl grid grid-cols-3 gap-4 max-w-4xl mx-auto">

                <div className="col-span-1 space-y-4">
                    <AnimationContainer delay={0.1}>
                        <div className="bg-zinc-900 p-4 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                                <span className="text-xs text-gray-400">Online</span>
                            </div>
                            <p className="text-sm font-extralight mb-1">auroramind.tech</p>
                            <h2 className="text-xl font-bold mb-1">More than</h2>
                            <h2 className="text-xl font-bold mb-1">10 million users</h2>
                            <p className="text-sm text-gray-400">around the world</p>
                        </div>
                    </AnimationContainer>
                    <AnimationContainer delay={0.1}>

                        <div className="bg-zinc-900 p-14 h-80 rounded-xl">
                            <div className="grid grid-cols-4 gap-5 mb-8">
                                {[...Array(16)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-green-500" />
                                    //   <Star key={i} className={`w-4 h-4 ${i % 3 === 0 ? 'text-green-500' : 'text-gray-700'}`} />
                                ))}
                            </div>
                            <p className="text-sm">Rated five stars</p>
                            <p className="text-sm font-bold">by 500,000 reviews.</p>
                        </div>
                    </AnimationContainer>
                </div>
                <div className="col-span-2 space-y-4">
                    <AnimationContainer delay={0.1}>

                        <div className="bg-zinc-900 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold mb-1">Trusted by <span className="text-white">50,000 businesses</span></h2>
                            <p className="text-xl text-gray-400 mb-6">for team communication.</p>
                            <div className="grid grid-cols-3 gap-4">
                                {['nextjs', 'stripe', 'supabase', 'webflow', 'vercel', 'airbnb'].map((logo) => (
                                    <div key={logo} className="p-2 rounded-lg flex items-center justify-center  brightness-0  dark:invert">
                                        <Image src={`/${logo}-logo.svg`} alt={`${logo} logo`} width={80} height={30} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimationContainer>
                    <AnimationContainer delay={0.1}>
                        <div className="bg-zinc-900 p-6 rounded-xl flex items-center">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-1">Available in</h2>
                                <p className="text-2xl font-bold mb-2">150+ countries.</p>
                                <p className="text-sm text-gray-400">No matter where you are, chances are our app is there for you.</p>
                            </div>
                            <div className="w-1/3 from-sky-500 to-indigo-500">
                                <Image src="/globe.jpg" alt="Globe" width={150} height={150} className='border bg-black' />
                            </div>
                        </div>
                    </AnimationContainer>
                </div>
            </div>
        </div>
    )
}