import { Router, Response, Request, NextFunction } from 'express'
import Post from '../../models/post'
import { BadRequestError } from "../../../common";


const router = Router()

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if(!id) {
        return next( new BadRequestError('post id is required!'))
    }

    try {
        await Post.findOneAndRemove({ _id: id })
    } catch(err) {
        next(new Error('post cannot be updated!'))
    }

    res.status(200).json({ success: true })
})

export { router as deletePostRouter }