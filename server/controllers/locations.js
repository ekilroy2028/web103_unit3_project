import { pool } from '../config/database.js'

const getAllLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to get locations' })
    }
}

const getLocationById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM locations WHERE id = $1', [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to get location' })
    }
}

export { getAllLocations, getLocationById }