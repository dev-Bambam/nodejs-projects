import {Schema, model} from 'mongoose'

// revokedToken schema in order to implement refresh token rotation

const revokedTokenSchema = new Schema({
   token: {
      type: String,
      required: true,
   },
   userId: {
      type: Schema.Types.ObjectId,
      required: true,
   },
   expiresAt: {
      type: Date,
      required: true,
   },
});

// indexing
revokedTokenSchema.index({ token: 1, studentId: 1 });
revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); //for automatic refreshToken deletion after it expires

const RevokedToken = model("RevokedToken", revokedTokenSchema)

export default RevokedToken;