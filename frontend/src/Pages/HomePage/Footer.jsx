const Footer = () => {
    return (
             <div className="bg-[rgba(255,49,49)] w-full p-16 box-border">
            <div className="w-full flex justify-between">
                <div>
                    <h1 className="text-4xl font-semibold text-white">TCU Airlines<span className="text-white">✈</span></h1>
                    <div className="mt-4">
                        <img alt="IATA Accredited" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/12/13/1513150321127-5096be77d2a19401b476853e54ba2cc6.svg?tr=h-35,q-75" class="inline-block mr-2" />
                        <img alt="BSI Certified" src="https://ik.imagekit.io/tvlk/image/imageResource/2021/05/10/1620638808154-e6c02ed786235ab59252628a9aa9b715.png?tr=h-35,q-75https://placehold.co/50x50" className="inline-block mr-2" />
                        <img alt="PCI DSS Compliant" src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711004601798-5a0a152c4bdede9bfe32439875879609.png?tr=h-40,q-75" className="inline-block" />
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2 text-white">Partner with TCUAirlines</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-2 shadow-md flex justify-center rounded-md">
                                <img alt="Payment partner VISA" src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339277845-57216452ce8a7cda236fa5392b9dc8a1.png?tr=h-19,q-75,w-57" className="w-12 h-auto inline-block" />
                            </div>
                            <div className="bg-white p-2 shadow-md flex justify-center rounded-md">
                                <img alt="Payment partner MasterCard" src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339280874-69888d44b71faf69435ee533506d91e2.png?tr=h-19,q-75,w-57" className="w-12 h-auto inline-block" />
                            </div>
                            <div className="bg-white p-2 shadow-md flex justify-center rounded-md">
                                <img alt="Payment partner Gcash" src="https://cdn.media.amplience.net/i/cebupacificair/GCash-276x96?fmt=auto&maxW=1920&maxH=1920&h=80&qlt=100" className="w-12 h-auto inline-block" />
                            </div>
                            <div className="bg-white p-2 shadow-md flex justify-center rounded-md">
                                <img alt="Payment partner American Express" src="https://cdn.media.amplience.net/i/cebupacificair/PayPal-logo?fmt=auto&maxW=1920&maxH=1920&h=80&qlt=100" className="w-12 h-auto inline-block" />
                            </div>
                            <div className="bg-white p-2 shadow-md flex justify-center rounded-md">
                                <img alt="Payment partner Discover" src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339316000-c0152d7d4fdce9b6421dd9559964ba55.png?tr=h-19,q-75,w-57" className="w-12 h-auto inline-block" />
                            </div>
                            <div className="bg-white p-2 shadow-md flex justify-center rounded-md">
                                <img alt="Payment partner UnionPay" src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339313470-3bbccd76ffb68c94739fce5d40a2e8af.png?tr=h-19,q-75,w-57" className="w-12 h-auto inline-block" />
                            </div>
                        </div>                    
                    </div>
                </div>
                <div className="flex">
                    <div className="mr-16">
                        <h2 className="text-xl font-semibold text-white">About TCU Airlines</h2>
                        <ul className="mt-2 text-white list-none pl-0">
                            <li>How to Book</li>
                            <li>Contact Us</li>
                            <li>Help Center</li>
                            <li>Careers</li>
                            <li>About Us</li>
                        </ul>
                    </div>
                    <div className="mr-16 text-white">
                        <h2 className="text-xl font-semibold text-white ">Products</h2>
                        <ul className="mt-2 list-none pl-0">
                            <li>Flights</li>
                            <li>Airport Transfer</li>
                            <li>Things to Do</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">Other</h2>
                        <ul className="mt-2 text-white list-none pl-0">
                            <li>#ExplorePH</li>
                            <li>Privacy Notice</li>
                            <li>Terms & Conditions</li>
                            <li>Vulnerability Disclosure Program</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-white">Follow us on</h2>
                    <div className="flex mt-2">
                        <a href="#" className="text-secondary mr-2 text-white"><i className="fab fa-facebook-square fa-2x"></i></a>
                        <a href="#" className="text-secondary mr-2 text-white"><i className="fab fa-instagram fa-2x"></i></a>
                        <a href="#" className="text-secondary mr-2 text-white"><i className="fab fa-twitter-square fa-2x"></i></a>
                        <a href="#" className="text-secondary mr-2 text-white"><i className="fab fa-youtube-square fa-2x"></i></a>
                        <a href="#" className="text-secondary mr-2 text-white"><i className="fab fa-tiktok fa-2x"></i></a>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Footer;