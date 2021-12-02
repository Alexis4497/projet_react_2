import React, { useState } from 'react';
import axios from 'axios';

const Article = ({article}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent]= useState("");

    const dateParser = (date) =>{
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
    year: "numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
    second:"numeric",
    });
    return newDate
    };

    const handleEdit = () => {
        
        const data = {
            author: article.author,
            content: editedContent,
            date: article.date,

        };
        
        axios.put('http://localhost:3003/articles/' + article.id, data)

        setIsEditing(false);
    };
    


    return (
      <div className="article">
          <div className="card-header">
              <h3>{article.author}</h3>
              <em>Posté le {dateParser(article.date)}</em>
          </div>
          {isEditing ?  (
              <textarea 
              onChange={(e) => setEditedContent(e.target.value)} 
              autoFocus 
              defaultValue={article.content}>
              </textarea>
          ) : (

            <p>{article.content}</p>

          )} {/*Equivalent if else*/}
          
          <div className="btn-container">
              {isEditing ? (

                  <button onClick={handleEdit}>Valider</button>

              ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              )}
              
              <button>Delete</button>
          </div>
      </div>
    );
};

export default Article;