import User from '../models/user';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
    User.find().exec((err, users) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ users });
    });
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
    if (!req.body.user.FullName || !req.body.user.Email || !req.body.user.Designation) {
        res.status(403).end();
    }

    const newUser = new User(req.body.user);

    // Let's sanitize inputs
    newUser.FullName = sanitizeHtml(newUser.FullName);
    newUser.Email = sanitizeHtml(newUser.Email);
    newUser.City = sanitizeHtml(newUser.City);
    newUser.State = sanitizeHtml(newUser.State);
    newUser.Country = sanitizeHtml(newUser.Country);
    newUser.Designation = sanitizeHtml(newUser.Desination);

    // newUser.CreatedAt = new Date();
    // newUser.UpdatedAt = new Date();

    // newUser.slug = slug(newUser.title.toLowerCase(), { lowercase: true });
    // newUser.cuid = cuid();
    newUser.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ user: saved });
    });
}

/**
 * Get a single user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
    User.findOne({ _id: req.params._id }).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ user });
    });
}

/**
 * Delete a user
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
    User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
        }

        user.remove(() => {
            res.status(200).end();
        });
    });
}
