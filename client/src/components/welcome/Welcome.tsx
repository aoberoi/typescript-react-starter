import React from 'react'; // tslint:disable-line:import-name
import s from './Welcome.css'; // tslint:disable-line:import-name

interface WelcomeProps {
  user?: { name?: string; };
}

// tslint:disable-next-line:variable-name
const Welcome = (props: WelcomeProps) => (
  <>
    <h2 className={s.message}>
      Welcome to TypeScript React Starter{(props.user && props.user.name) ? `, ${props.user.name}` : ''}
    </h2>
  </>
);

export default Welcome;
