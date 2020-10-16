import React from 'react'

const HelpCard = () => {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-12">
                <div className="bg-transparent col-md-6 text-center mx-auto">
                    <h5 className="card-title text-light">About using this app please read the <span className="text-primary"><i>help</i></span> below: </h5>
                <p className="text-light text-center card-text">
                        Once you are registered you will see the notification telling you to login after being
                         logged in you are redirected to homepage where there is the status of your working Library
                </p>
                    <p className="text-light text-center card-text">
                        Inorder to start working with this web app first add the books based on their types
                        after add students and teachers
                </p>
                     <p className="text-light text-center card-text">
                        After doing that you can lend, edit, delete, promote students and also the same things for teachers exept promoting them
                        and other many options for them you will see as you continue using it
                </p>
                     <p className="text-light text-center card-text">
                        For advanced options you can tap to settings in the navigation and you will be prompt to enter
                        your password after that you will see advanced options but pay attention with them
                </p>
                     <p className="text-primary text-center card-text">
                      Enjoy the system app!!
                </p>
                </div>
            </div>
        </div>
    )
}

export default HelpCard