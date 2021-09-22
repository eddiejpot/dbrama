import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import AceEditor from "react-ace";
import colors from '../colors';

const useStyles = makeStyles((theme) => ({
  root:{
    width: '400px'
  },
  content:{
    display:'flex',
    flexDirection: 'column'
  },
  snippet:{
    backgroundColor: colors.grey,
    padding: '0px 5px',
  }
}));

// =============================================
// ============================== MAIN COMPONENT
// =============================================
export default function FaqAccordion() {
  const classes = useStyles();

  const makeCodeSnippet = (textInput) => {
    return (
            <AceEditor
            placeholder="Placeholder Text"
            mode="ruby"
            theme="monokai"
            name="blah2"
            width="100%"
            maxLines={Infinity}
            // onLoad={this.onLoad}
            // onChange={this.onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={false}
            // highlightActiveLine={true}
            value={textInput}
            setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: false,
            tabSize: 2,
            readOnly:true,
            }}/>
    )
  }


  const tableExample = `Table users {
  id int [pk]
  name varchar
}`

  const tableSyntax = `Table table_name {
  col_name col_type [col_settings]
  col_name col_type [col_settings]
}`
  const relatioshipSyntax =`
table_name.col_name < table_name.col_name
`

  return (
    <div className = {classes.root}>
      <Box sx={{ border: 1, p: 2, bgcolor: colors.gunmetal}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>How to write DBML</Typography>
          </AccordionSummary>
          <AccordionDetails className = {classes.content}>
            <Typography variant="h6" gutterBottom>
            Table Definition
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
            Example 
            </Typography>
            {makeCodeSnippet(tableExample)}
            <Typography variant="subtitle1" gutterBottom>
            Syntax
            </Typography>
            {makeCodeSnippet(tableSyntax)}
            <br></br>
            <Typography variant="h6" gutterBottom>
            Relationships
            </Typography>
    
            <li><strong>{'< one-to-many '}</strong><i className={classes.snippet}>{`users.id < posts.user_id`}</i></li>
            <li><strong>{'> many-to-one '}</strong><i className={classes.snippet}>{`posts.user_id > users.id`}</i></li>
            <li><strong>{'- one-to-one '}</strong><i className={classes.snippet}>{`users.id - user_infos.user_id`}</i></li>
  
            <Typography variant="subtitle1" gutterBottom>
            Syntax
            </Typography>
            {makeCodeSnippet(relatioshipSyntax)}
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}