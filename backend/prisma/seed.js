const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Début du seeding...');

  // Nettoyer la base de données existante
  await prisma.submittedCollaboration.deleteMany();
  await prisma.game.deleteMany();
  await prisma.collaboration.deleteMany();
  await prisma.user.deleteMany();
  await prisma.artist.deleteMany();

  console.log('Base de données nettoyée');

  // Créer quelques artistes
  const kendrick = await prisma.artist.create({
    data: {
      name: 'Kendrick Lamar',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022',
      spotifyId: '2YZyLoL8N0Wb9xBt1NhZWg',
    },
  });

  const drake = await prisma.artist.create({
    data: {
      name: 'Drake',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
      spotifyId: '3TVXtAsR1Inumwj472S9r4',
    },
  });

  const jayz = await prisma.artist.create({
    data: {
      name: 'Jay-Z',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb283c28c4a3c9c1a4ab339a59',
      spotifyId: '3nFkdlSjzX9mRTtwJOzDYB',
    },
  });

  const travisScott = await prisma.artist.create({
    data: {
      name: 'Travis Scott',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5d3c8bd43a298e7fb9d1b2a9',
      spotifyId: '0Y5tJX1MQlPlqiwlOH1tJY',
    },
  });

  console.log('Artistes créés');

  // Créer quelques collaborations
  const collab1 = await prisma.collaboration.create({
    data: {
      mainArtistId: kendrick.id,
      featuredArtistId: drake.id,
      songTitle: 'Poetic Justice',
      releaseYear: 2012,
      spotifyTrackId: '2P3SLxeQHPqh8qKB6gtJY2',
    },
  });

  const collab2 = await prisma.collaboration.create({
    data: {
      mainArtistId: drake.id,
      featuredArtistId: jayz.id,
      songTitle: 'Light Up',
      releaseYear: 2010,
      spotifyTrackId: '3D4qYDvoPn5cQxtBm4osU0',
    },
  });

  const collab3 = await prisma.collaboration.create({
    data: {
      mainArtistId: travisScott.id,
      featuredArtistId: kendrick.id,
      songTitle: 'goosebumps',
      releaseYear: 2016,
      spotifyTrackId: '6gBFPUFcJLzWGx4lenP6h2',
    },
  });

  console.log('Collaborations créées');

  // Créer un utilisateur admin
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@wikifeats.com',
      password: '$2a$10$GQf3r.Mib.wi9hX8sH3YAuws8MmZ.prU08Lx5LaIHCcmuGXvxq7Aq', // 'admin123' hashé
      role: 'ADMIN',
    },
  });

  // Créer un utilisateur normal
  const user = await prisma.user.create({
    data: {
      username: 'user',
      email: 'user@wikifeats.com',
      password: '$2a$10$GQf3r.Mib.wi9hX8sH3YAuws8MmZ.prU08Lx5LaIHCcmuGXvxq7Aq', // 'user123' hashé
      role: 'USER',
    },
  });

  console.log('Utilisateurs créés');

  // Créer quelques collaborations soumises
  const pendingCollab1 = await prisma.submittedCollaboration.create({
    data: {
      artist1Name: 'Kendrick Lamar',
      artist2Name: 'J. Cole',
      title: 'Forbidden Fruit Remix',
      album: 'Unreleased',
      releaseDate: new Date('2023-10-15'),
      producers: ['DJ Premier', 'Alchemist'],
      musicLink: 'https://soundcloud.com/example/forbidden-fruit-remix',
      additionalInfo: 'Collaboration rumored to be on upcoming album',
      status: 'PENDING',
      artist1Id: kendrick.id,
    },
  });

  const pendingCollab2 = await prisma.submittedCollaboration.create({
    data: {
      artist1Name: 'Drake',
      artist2Name: 'Kanye West',
      title: 'Forever 2',
      album: 'Unreleased',
      releaseDate: new Date('2023-11-20'),
      producers: ['40', 'Mike Dean'],
      musicLink: 'https://soundcloud.com/example/forever-2',
      additionalInfo: 'Sequel to their 2009 collaboration',
      status: 'PENDING',
      artist1Id: drake.id,
    },
  });

  const approvedCollab = await prisma.submittedCollaboration.create({
    data: {
      artist1Name: 'Travis Scott',
      artist2Name: 'Future',
      title: 'Astronomical',
      album: 'UTOPIA Deluxe',
      releaseDate: new Date('2023-08-10'),
      producers: ['Metro Boomin', 'Wheezy'],
      musicLink: 'https://spotify.com/track/example',
      additionalInfo: 'Bonus track from UTOPIA sessions',
      status: 'APPROVED',
      approvedAt: new Date(),
      artist1Id: travisScott.id,
    },
  });

  const rejectedCollab = await prisma.submittedCollaboration.create({
    data: {
      artist1Name: 'Unknown Artist',
      artist2Name: 'Jay-Z',
      title: 'Fake Collab',
      album: 'Non-existent',
      musicLink: 'https://youtube.com/watch?v=fake',
      additionalInfo: 'This is a fake submission',
      status: 'REJECTED',
      rejectedAt: new Date(),
    },
  });

  console.log('Collaborations soumises créées');

  console.log('Seeding terminé avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 