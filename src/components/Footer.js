import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';

function Footer() {
    const storeDetailsKey = useSelector(state => state.storeDetailsKey)
    const { store } = storeDetailsKey

    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        {store.name && store.logo_url ? (<Col className="text-center py-3">Copyright &copy; {store.name}</Col>) :
                            (<Col className="text-center py-3">Copyright &copy; Catalog</Col>)
                        }
                    </Row>
                    {store.name && store.logo_url ? (
                        <div>
                            <Row>
                                <i class="fa fa-phone fa-fw">
                                    &nbsp;&nbsp;{store.contact_no}
                                </i>
                            </Row>
                            <Row>
                                <i class="fa fa-address-card fa-fw">
                                    &nbsp;&nbsp;{store.address}
                                </i>
                            </Row>
                        </div>
                    ) : ("")
                    }

                </Container>
            </footer>
        </div >
    )
}

export default Footer