export const navItems = [
  {
  
      name: 'DASHBOARD',
      url: '/dashboard',
      icon: 'fa fa-tachometer',
      },
  
    {
      name: 'CUSTOMERS',
      url: '/addcustomer',
      icon: 'icon-user',
      children: [
        {
          name: 'Check Customer',
          url: '/backend/checkcase',
          icon: 'fa fa-user-plus'
        },
        {
          name: 'Customer List',
          url: '/members/viewcustomer',
          icon: 'fa fa-handshake-o'
        },
        // {
        //   name: 'Add Customer',
        //   url: '/members/add',
        //   icon: 'fa fa-user-plus'
        // },
        // {
        //   name: 'Login List',
        //   url: '/members/approval',
        //   icon: 'fa fa-sign-in'
        // },
      
        // {
        //   name: 'PD List',
        //   url: '/members/pdlist',
        //   icon: 'fa fa-handshake-o'
        // },
  
        // {
        //   name: 'Approval List',
        //   url: '/members/approve',
        //   icon: 'fa fa-check-square-o'
        // },
  
        // {
        //   name: 'Disbursed List',
        //   url: '/members/disbursed',
        //   icon: 'fa fa-check-circle'
        // },
        {
          name: 'Topup List ',
          url: '/members/viewtopup',
          icon: 'fa fa-thumbs-o-up'
        },
        {
          name: 'Share Documents',
          url: '/404',
          icon: 'icon-user-following'
        },
      ]},
      
      {
        name: 'WEBSITE',
        url: '/website',
        icon: 'fa fa-globe',
        children: [
          {
            name: 'CONTACT US',
            url: '/member/contact',
            icon: 'fa fa-handshake-o',
          
          },
        
          {
            name: 'CAREER',
            url: '/member/career',
            icon: 'fa fa-briefcase',
           },
           {
            name: 'CALL BACK',
            url: '/member/callback',
            icon: 'fa fa-phone',
           },
      
        ]},
    {
      name: 'EMPLOYEE',
      url: '/employee',
      icon: 'fa fa-briefcase',
      children: [
        
        {
          name: 'Add Employee',
          url: '/member/employee',
          icon: 'icon-note'
        },
        {
          name: 'Employee List',
          url: '/member/employeelist',
          icon: 'icon-eye'
        },
  
        // {
        //   name: 'Executive List',
        //   url: '/members/viewexecutive',
        //   icon: 'icon-eye'
        // },
      ]},
      {
        name: 'ACCOUNTS',
        url: '/employee',
        icon: 'fa fa-money',
        children: [
          {
            name: 'ADD PAYOUTS',
            url: '/account/subvendor',
            icon: 'fa fa-sign-out',
          
          },
        
          {
            name: 'ADD TRANSCATIONS',
            url: '/account/disburselist',
            icon: 'fa fa-globe',
           },
     
      
        ]},
    
  
      // {
      //   name: 'TRACK STATUS',
      //   url: '/members/checktrack',
      //   icon: 'fa fa-bar-chart'
      // },
  

  {
    name: 'SETTINGS',
    url: '/receipt',
    icon: 'icon-wrench',
    children: [
      {
        name: 'Document Cam',
        url: '/member/bank',
        icon: 'icon-home'
      }, 
      {
        name: 'VIEW PASSWORD',
        url: '/member/emppassword',
        icon: 'icon-docs'
      },
      // {
      //   name: 'Bulk Sms',
      //   url: '/member/bulksms',
      //   icon: 'fa fa-commenting-o'
      // },
      // {
      //   name: 'View Details',
      //   url: '/member/viewdetails',
      //   icon: 'icon-user'
      // },
      {
        name: 'Add Banks',
        url: '/member/bank',
        icon: 'icon-home'
      },
      {
        name: 'Loan Type',
        url: '/member/loantype',
        icon: 'icon-docs'
        
      },
      {
        name: 'User Type',
        url:'/member/user',
        icon : 'icon-user'
      },
      {
        name: 'Employee Type',
        url:'/member/employeetype',
        icon : 'icon-user'
      },
      {
        name: 'Add Tenure',
        url:'/member/addperiod',
        icon : 'icon-user'
      },
       {
        name:'Change Password',
        url:'/member/changepwd',
        icon:'icon-settings'
    },
  //   {
  //     name:'Add Program List',
  //     url:'/members/program',
  //     icon:'icon-docs'
  // },
    {
      name:'Email Settings',
      url:'/member/settings',
      icon:'icon-settings'
  }
    ]}, 
    {
      name: 'REPORT',
      url: '/receipt',
      icon: 'fa fa-bug',
      children: [
        {
          name: 'Executive Wise Enquired List',
          url: '/executives/viewexecutives',
          icon: 'fa fa-list-ul'
        },
        {
          name: 'Enquired List',
          url: '/reports/datatelelist',
          icon: 'fa fa-list-ul'
        },
  
        {
          name: 'Executive Routine',
          url: '/reports/exeroutine',
          icon: 'icon-docs'
  
        },
        {
          name: 'Login Executive Routine',
          url: '/reports/logroutine',
          icon: 'icon-user'
        },
        {
          name: 'Login Reports',
          url: '/reports/logreport',
          icon: 'icon-user'
        },
  
        {
          name: 'Backend Report',
          url: '/reports/backreport',
          icon: 'icon-docs'
        },
        {
          name: 'Dataentry Report',
          url: '/reports/dataentryreport',
          icon: 'icon-user'
        },
        // {
        //   name: 'Reject List',
        //   url: '/members/reject',
        //   icon: 'icon-settings'
        // },
        // {
        //   name: 'Customer Bank List',
        //   url: '/members/completlist',
        //   icon: 'icon-settings'
        // },
      ]
    },
];
