import React from 'react';
import {Divider, Paragraph, Title} from '../atoms/components';
import {HeaderLogo, OverviewCard, QuizCard} from '../molecules/headers';

export default Overview = () => (
  <>
    <HeaderLogo />
    <Title>De beste lokale koffie, in eigen huis</Title>
    <Divider />
    <Paragraph>Ontdek nieuwe smaken van lokale koffiebranders</Paragraph>
    <OverviewCard />
  </>
);
