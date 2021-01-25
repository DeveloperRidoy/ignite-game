import classes from './Spinner.module.css';


const Spinner= () => {
    return (
      <div className={classes.Spinner}>
        <div className={classes.ldsGrid}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
}

export default Spinner;
