import {Router} from 'express';
import passport from 'passport';
import UserDTO from '../dao/DTOs/user.dto';
import auth from '../middlewares/auth';


const router = Router();
const usersRouter = router;

router.post("/register", passport.authenticate('register',{failureRedirect:'/failregister'}) ,async (req, res) => {
    res.redirect('/')
});
router.get('/failregister', async(req,res)=> {
    console.log("Registro erroneo");
    res.send({error:"Failed"})
})

router.post("/login", passport.authenticate('login',{failureRedirect:'/faillogin'}) ,async (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
});
router.post("faillogin", async(req,res) => {
    console.log("Ingreso erroneo");
    res.send({error:"Failed"})
})

router.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res) => {});
router.get('/githubcallback',passport.authenticate('github',{failureRedirect: '/login'}), async(req,res) =>{
    res.redirect('/');
})

router.get('/current', auth, (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
  });

export default usersRouter;