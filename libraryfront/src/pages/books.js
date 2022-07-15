import React,{useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import livreService from '../services/livre';
export default function Books() {
    const [Books, setBooks] = useState([])

const getallBooks = () =>{
    livreService.getAllLivrePuvb().then(response =>{
        setBooks(response.data)
        console.log(response.data)
    })
}
useEffect(() => {
    getallBooks()
}, [])
  return (
    <div>
 {Books.map((book,index)=>(
    <Card key={index} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.picture}
        alt="book picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.Titre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {book.Discription}
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button href={`/bookdetalis/${book._id}`} size="small">See book content</Button>
      </CardActions>
    </Card>
))}
    </div>
  )
}












