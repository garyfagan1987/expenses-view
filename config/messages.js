export default {
  index: {
    heading: 'Welcome to expenses app',
    title: 'Expenses',
  },
  login: {
    error: 'Unable to log in',
    form: {
      button: 'Log in',
      fields: {
        email: {
          placeholder: 'Email',
        },
        password: {
          placeholder: 'Password',
        },
      },
    },
    heading: 'Log in',
    spinner: 'Beep-boop',
    success: 'Logged in',
    title: 'Expenses',
  },
  navigation: {
    item1: 'Login',
    item2: 'Register',
    item3: 'Reports',
    item4: 'Log out',
    primary: 'Expenses',
  },
  register: {
    error: 'Unable to register',
    form: {
      button: 'Register',
      fields: {
        email: {
          placeholder: 'Email',
        },
        name: {
          placeholder: 'Name',
        },
        password: {
          placeholder: 'Password',
        },
      },
    },
    heading: 'Register',
    spinner: 'Beep-boop',
    success: 'Registered',
    title: 'Expenses',
  },
  report: {
    breadcrumbs: ['Expense Report', 'Update'],
    error: 'Report could not be found',
    success: 'Report has been updated',
    title: 'Expenses | Update Report',
  },
  reportCreate: {
    breadcrumbs: ['Expense Reports', 'Create'],
    error: 'Report could not be created',
    title: 'Expenses | Create Report',
  },
  reportDelete: {
    error: 'There was a problem trying to delete this report',
    success: 'Your report was deleted',
  },
  reports: {
    breadcrumbs: ['Expense Reports'],
    buttons: {
      create: 'Create report',
      delete: 'delete',
      edit: 'edit',
    },
    error: 'There was a problem loading your reports',
    spinner: 'Getting your reports',
    table: {
      action: 'Action',
      date: 'Date',
      published: 'Published',
      publishedNo: 'No',
      publishedYes: 'Yes',
      title: 'Title',
      totalGross: 'Total Gross',
      totalVat: 'Total VAT',
    },
    title: 'Expenses | Reports',
  },
};
