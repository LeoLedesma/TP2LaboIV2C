// export interface Card {
//     cards: any;
//     remaining: number;
    
// }

export interface CardDTO {
    cards:     Card[];
    deck_id:   string;
    remaining: number;
    success:   boolean;
   }
   
   export interface Card {
    code:   string;
    image:  string;
    images: Images;
    suit:   string;
    value:  string;
    
   }
   
   export interface Images {
    png: string;
    svg: string;
   }
   