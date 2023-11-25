export default {
  boards: [
    {
      _id: 0,
      name: 'Platform Launch',
      columns: [
        {
          _id: 0,
          name: 'To Do',
          cards: [
            {
              _id: 0,
              name: 'Build UI for onboarding flow',
              done: 0,
            },
            {
              _id: 1,
              name: 'Build UI for search',
              done: 0,
            },
          ],
        },
        {
          _id: 1,
          name: 'In Process',
          cards: [
            {
              _id: 0,
              name: 'Design settings and search pages',
              done: 1,
            },
            {
              _id: 1,
              name: 'Add account management endpoints',
              done: 0,
            },
          ],
        },
        {
          _id: 2,
          name: 'Done',
          cards: [
            {
              _id: 0,
              name: 'Create 5 wireframe tests',
              done: 1,
            },
            {
              _id: 1,
              name: 'Create Wireframe prototype',
              done: 1,
            },
          ],
        },
        {
          _id: 3,
          name: 'Review',
          cards: [
            {
              _id: 0,
              name: 'Code for React Card Component',
              done: 0,
            },
            {
              _id: 1,
              name: 'Create Wireframe prototype',
              done: 0,
            },
          ],
        }
      ],
    },
    {
      _id: 1,
      name: 'Marketing Plan',
      columns: [
        {
          _id: 0,
          name: 'To Do',
          cards: [
            {
              _id: 0,
              name: 'Plan Product Hunt Launch',
              done: 0,
            },
            {
              _id: 1,
              name: 'Share on Show',
              done: 0,
            },
          ],
        },
      ],
    },
    {
      _id: 2,
      name: 'Roadmap',
      columns: [
        {
          _id: 0,
          name: 'To Do',
          cards: [
            {
              _id: 0,
              name: 'Plan Roadmap',
              done: 0,
            },
            {
              _id: 1,
              name: 'Share on Show',
              done: 0,
            },
          ],
        },
      ],
    },
  ],
};