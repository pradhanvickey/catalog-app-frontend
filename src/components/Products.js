import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <CardActionArea>
                <CardMedia
                    component="img"
                    width="250px"
                    height="250px"
                    image={product.image_url}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title.split(" ").reduce((s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "), '')}
                    </Typography>
                    <Typography variant="body3" color="text.secondary" sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }}>
                        {product.description}
                    </Typography>
                    <br></br>
                    <Box sx={{ display: "flex" }}>
                        <div>
                            <Typography level="body3">Price:</Typography>
                            <Typography fontSize="lg" fontWeight="lg">
                                Rs{product.price}
                            </Typography>
                        </div>
                        <Button
                            variant="soft"
                            size="sm"
                            color="primary"
                            aria-label="Availabilty Status"
                            sx={{ ml: "auto", fontWeight: 600 }}
                        >
                            Available: {product.is_active ? <i className='fas fa-check' style={{ color: 'green' }} /> : (
                                <i className='fas fa-times' style={{ color: 'red' }} />
                            )}
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Product;