req.user = user;
next();

router.get(
   "/projects",
   protect,
   getProjects
);

