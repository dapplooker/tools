import {gql} from '@apollo/client';

export const ENT = gql`
query{
    __schema{
      queryType {
        fields {
          name
       }
      }
    }
}
`;

export const COL = (entity) => {
  return(
    gql`
        query{
          __type(name:"${entity}"){
            name
          fields{
            name
            type{
              ofType{
                kind
              }
            }
          }
        }
        }
    `
  )     
}
export const DAT = (val,entN) => {
  return(
    gql`
        query {
          entity: ${entN}{
             ${val}
             
          }
        }
    `
   )
}

