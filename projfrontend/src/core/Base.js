import React from 'react';
import Menu from "./menu";
import "../styles.css";

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white p-4", children }) => {

    return (
        <div>
            <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                    {children}
                </div>

            </div>
            <footer class="page-footer font-small bg-dark text-white" >

                <div class="footer-copyright text-center py-3">© 2020 Copyright:
                LearnCOdeONline
                </div>

            </footer>

        </div>


    );
}

export default Base;