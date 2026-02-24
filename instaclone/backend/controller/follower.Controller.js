const followerModel = require("../model/follower.model");
const userModel = require("../model/user.model");

async function followController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(401).json({
      message: "User cannot follow him/her self",
    });
  }

  const isUserTrue = await userModel.findOne({ username :followeeUsername });

  if (!isUserTrue) {
    return res.status(404).json({
      message: "User does not exists",
    });
  }

  const isAlreadyFollowee = await followerModel.findOne({
    Follower: followerUsername,
    Followee: followeeUsername,   
  });

  if (isAlreadyFollowee) {
    return res.status(401).json({
      message: "Already a follower",
    });
  }

  const follow = await followerModel.create({
    Follower: followerUsername,
    Followee: followeeUsername,
  });

  res.status(200).json({
    message: `You are following ${followeeUsername}.`,
  });
}


async function unfollowController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isAlreadyFollow = await followerModel.findOne({
        Follower : followerUsername,
        Followee : followeeUsername
    })

    if(!isAlreadyFollow){
        return res.status(200).json({
            message : `You are not following ${followeeUsername}`
        })
    }

    await followerModel.findByIdAndDelete(isAlreadyFollow._id)

    res.status(200).json({
        message : `You unfollowed ${followeeUsername}`
    })
}
module.exports = {
    followController,
    unfollowController
};
