import React from 'react';

import {greet} from '@monorepo/common/greet';

export function Home(): JSX.Element {
  const text = greet('John Doe');

  return (
    <div>
      <div>Home</div>
      <div>{text}</div>
    </div>
  );
}
