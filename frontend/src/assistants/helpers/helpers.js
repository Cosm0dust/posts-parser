export const decodeCDATA = (cdataContent) => {
   if (typeof cdataContent === 'string' && cdataContent.startsWith('<![CDATA[') && cdataContent.endsWith(']]>')) {
      return cdataContent.substring(9, cdataContent.length - 3);
   } else {
      return cdataContent;
   }
}

export const createMarkup = (html) => {
   return { __html: html };
};

export const formatDate = (inputDate) => {
   const date = new Date(inputDate);
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const year = date.getFullYear() % 100; 
 
   const formattedDay = day < 10 ? `0${day}` : day;
   const formattedMonth = month < 10 ? `0${month}` : month;
 
   return `${formattedMonth}/${formattedDay}/${year}`;
 };